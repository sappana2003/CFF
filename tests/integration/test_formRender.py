"""
pipenv run python -m unittest tests.integration.test_formRender
"""
import unittest
from chalice.config import Config
from chalice.local import LocalGateway
import json
from .constants import FORM_ID, FORM_V2_ID, FORM_V2_RENDER_RESP
from app import app
from tests.integration.baseTestCase import BaseTestCase
from chalicelib.models import User
import os
from pymodm.errors import DoesNotExist

class FormRender(BaseTestCase):
    def test_render_form(self):
        self.formId = self.create_form()
        response = self.lg.handle_request(method='GET',
                                          path=f'/forms/{self.formId}',
                                          headers={"authorization": "auth",},
                                          body='')
        self.assertEqual(response['statusCode'], 200, response)
        body = json.loads(response['body'])
        self.assertEqual(set(("_id", "name", "schema", "uiSchema", "formOptions")), set(body['res'].keys()))
        self.assertEqual(body['res']['_id']['$oid'], self.formId)
    def test_render_form_with_response_new_user(self):
        self.userId = os.environ["DEV_COGNITO_IDENTITY_ID"]
        try:
            user = User.objects.get({"id": self.userId})
            user.delete()
        except DoesNotExist:
            pass
        self.test_render_form_with_response()
    def test_render_form_with_response(self):
        formData = {"a":"b"}
        self.formId = self.create_form()
        response = self.lg.handle_request(method='POST',
                                        path=f'/forms/{self.formId}',
                                        headers={"authorization": "auth","Content-Type": "application/json"},
                                        body=json.dumps({"data": formData}))
        self.assertEqual(response['statusCode'], 200, response)
        body = json.loads(response['body'])
        
        response = self.lg.handle_request(method='GET',
                                    path=f'/forms/{self.formId}',
                                    headers={"authorization": "auth",},
                                    body='')
        self.assertEqual(response['statusCode'], 200, response)
        body = json.loads(response['body'])

        self.assertEqual(set(("_id", "name", "schema", "uiSchema", "formOptions")), set(body['res'].keys()))
        self.assertEqual(body['res']['_id']['$oid'], self.formId)
        self.assertTrue("responseId" in body)
        self.assertEqual(body["responseData"], formData)