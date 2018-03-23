export default ({ profiles, users }) => <>
  {profiles.map((profile, profileIdx) => <div key={profileIdx}>
    {JSON.stringify(profile)}
  </div>)}

  {users.map(user => <div key={user._id}>
    {JSON.stringify(user)}
  </div>)}
</>
