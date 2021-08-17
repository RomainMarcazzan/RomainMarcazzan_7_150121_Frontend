import Loader from "react-loader-spinner";
import "./Loading.css";
function Loading() {
  return (
    <div className="loading">
      <Loader type="Bars" color="#fd2d01" height={60} width={60} />
    </div>
  );
}

export default Loading;
