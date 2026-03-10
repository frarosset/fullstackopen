# PHONEBOOK

Backend available at: https://phonebook-fant.onrender.com/

- get all persons and numbers:

  GET https://phonebook-fant.onrender.com/api/persons

- get specific person by id (eg, id=1)

  GET https://phonebook-fant.onrender.com/api/persons/1

- create a person

  POST https://phonebook-fant.onrender.com/api/persons

  Headers: {"Content-Type": "application/json"}

  Body: {"name": "New Person", "number": "123456789"}

- delete specific person by id (eg, id=1)

  DELETE https://phonebook-fant.onrender.com/api/persons/1

- get generic info on phonebook

  GET https://phonebook-fant.onrender.com/info
