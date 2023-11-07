import React, { useContext } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";


const Home = (props) => {

  const context = useContext(AuthContext)

  return (
    <Card className='home'>
      <h1>Рады Вас Видеть Снова!</h1>
      <Button onClick={context.onLogout}>Выход</Button>
    </Card>
  );
};

export default Home;
