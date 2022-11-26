type UserInfoProps = {
  name: string;
  bio: string;
  phone: number;
  email: string;
  password: string;
  picture_url: string;
}

export interface UserInfoViewProps {
  userInfo: UserInfoProps;
}

const UserInfoView = ({ userInfo }: UserInfoViewProps) => {
  return (
    <div className="user-info-container">
      <p>{userInfo.name}</p>
      <p>{userInfo.bio}</p>
      <p>{userInfo.phone}</p>
      <p>{userInfo.email}</p>
      <p>{userInfo.password}</p>
      <p>{userInfo.picture_url}</p>
    </div>
  )
}

export default UserInfoView