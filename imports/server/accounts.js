if (Users.findOne()) return

Accounts.createUser({ username: 'mongodog', password: 'woof' })
