import DarkModeToggle from './DarkModeToggle';
import UserAvatar from './UserAvatar';
import useUserInfo from '../lib/useUserInfo';
import { Badge } from './ui/Badge';

const Header = () => {

  const { user } = useUserInfo();

  return (
    <header className="w-full py-3 px-5 flex justify-between items-center ">

      <h1 className="text-2xl font-bold flex relative">LeetQuest{user?.role === 'admin' && (
        <Badge variant="default" className="scale-50 absolute -top-2 -right-14">Admin</Badge>
      )}</h1>

      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        {user && <UserAvatar username={user.username} />}
      </div>
    </header>
  );
};

export default Header;
