import Header from '../components/Header';
import MyTabs from '../components/Mainpage/Tabs';


const MainPage = () => {
  
  return (
    <div className="min-h-screen min-w-screen ">
      <Header />
      <main className="mt-10 w-3/4 flex justify-start items-baseline m-auto">
        <MyTabs />
      </main>
    </div>
  );
};

export default MainPage;
