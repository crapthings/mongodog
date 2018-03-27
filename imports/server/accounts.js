if (Users.findOne({ username: 'mongodog' })) return

Accounts.createUser({ username: 'mongodog', password: 'woof' })
