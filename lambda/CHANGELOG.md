Todo: more rigorous tests for response checkin endpoint, also for view responses for people with only Responses_CheckIn permission.
Todo: version api urls (/1.x/...)

# 2.0.9 (tbd) (check version notes of ccmt-cff-client from now on)
- Add mongodb (cosmosdb)
- Use pymodm
- Endpoint changes to be more RESTful.
todo: fix paypal url.

/forms/{formId}/render -> /forms/{formId}
/centers/{centerId}/forms - removed
/centers/{centerId}/schemas - removed
/centers - removed

# 1.1.14 (5/26/18)
- Fix responseSendConfirmationEmail endpoint to work with v2 version of form
- Allow undefined variables to not crash jinja templates in email; add format_payment filter to templates too.

# 1.1.13 (5/24/18)
- Bug fix: Allow payment (and ipn handler) to work with v2 version of forms

# 1.1.12 (5/20/18)
- Allow uiSchema and schema to be specified directly within the form itself.
- Don't include default email css on templates
- Set up part of responses export url.

# 1.1.11 (5/19/18)
- Add auto_email and manual_approval options to paymentMethods.
- Allow jinja templates in confirmationEmailInfo to be specified for each paymentMethod.
- All tests should pass now.
- Add code from manual om run tools.

# 1.1.10 (5/13/18)
- Let email total amount text to be customized (totalAmountText in confirmationEmailInfo)
- Let columns in email table be customized, too:
  - {"responseTableOptions": {"columnOrder": ["participants", "email"]}} in confirmationEmailInfo

# 1.1.9 (5/10/18)
- Return all fields for paymentInfo (so payment page can be more customized)

# 1.1.8 (5/2/18)
Major:
- CCAvenue integration

Minor:
- Upon form submit, the api also returns paymentMethods (with things such as ccavenue hash already computed)
- Only return center ID and name from listCenters endpoint (so centers can contain secret info, payment info, etc.)
- Support different currency formatting (not just USD) in emails
- Remove "Amount Received" from confirmation email.

# 1.1.7 (4/30/18)
- Bugfix: fix edit response problem.
- Add integration tests for admin response edit.

# 1.1.6 (4/29/18)
- Allow people with Responses_CheckIn permission to view all responses and view individual response too.

# 1.1.5 (4/28/18)
- Add response checkin endpoint: /forms/{formId}/responses/{responseId}/checkin -- requires permission Responses_CheckIn.

# 1.1.4 (4/28/18)
- Make mainImage in confirmation email a bit bigger.

# 1.1.3 (4/26/18)
- Cache all responses every 100 seconds, so it's not *super* slow.

# 1.1.2 (4/23/18)
- Use Flatterdict -- fix lists not flattening in emails sent.
- refactor some email sending code, tests

# 1.1.1 (4/21/18)
- Allow an array to be specified in confirmationEmailInfo.toField, also if email is undefined it won't break but will just skip that one.

# 1.1.0 (4/20/18) (frontend 1.3.0)
- Add code for new form submit.
- add view permissions, edit permissions endpoint.
- Store permissions differently: {userId: {perm1: true, perm2: true, ...}} rather than {permName: [...userIds]}.
- Return all new from edit response endpoint

# 1.0.6 (4/12/18)
- Reorganization of app.py into multiple files.
- Add list_schemas endpoint.
- Add create_form endpoint.
- create user entry with info on new login (on center list endpoint)

# 1.0.5 (4/9/18)
- View ALL responses through pagination and multiple queries if necessary (before it was limiting to ~400)

# 1.0.4 (4/6/18) (frontend 1.2.4)
- Response editing view by admin (requires `ResponsesEdit` permission)

# 1.0.3 (4/2/18)
- Fix bug: don't break on new user login

# 1.0.2 (4/1/18)
- Form response summaries

# 1.0.1 (3/31/18)
- Remove dynamorm / marshmallow, to make it much faster.

# 1.0.0 (3/31/18)
- Initial deployment
