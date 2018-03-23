const Form = () => <form onSubmit={onSubmit}>
  <input type='text' />
  <input type='password' />
  <input type='submit' />
</form>

function onSubmit(evt) {
  evt.preventDefault()
  Meteor.loginWithPassword(evt.target[0].value, evt.target[1].value, err => {
    err && console.log(err)
  })
}

export default C => ({ userId, ready, ...props }) => !userId ? Form() : (!ready ? LoadingComp : C(props))
