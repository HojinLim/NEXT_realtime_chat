import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navi = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 로직
    dispatch(logout(navi));
  };
  const goMyPage = () => {
    navi("/mypage");
  };

  return (
    <div className="flex justify-between items-center bg-blue-500 p-4 text-center">
      {user! ? (
        <>
          <div
            className="text-white hover:cursor-pointer hover:text-blue-300 hover:underline"
            onClick={goMyPage}
          >
            Hi, {user?.name}
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </>
      ) : (
        <div className="text-white">No user</div>
      )}
      <h1
        onClick={() => navi("/")}
        className="text-white flex-grow text-center hover:cursor-pointer hover:text-blue-300 hover:underline"
      >
        Header
      </h1>
      <div>
        {user! && (
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
