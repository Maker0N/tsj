import React from "react";
import { Link } from "react-router-dom";

const Front = () => {
  return (
    <div>
      <div className="d-flex justify-content-center text-warning fs-1 fw-bold">
        <div>ТСЖ и ТСЖ</div>
      </div>
      <div className="d-flex justify-content-center fs-1">
        <Link to="/login">
          <button className="btn btn-primary">ВХОД</button>
        </Link>
      </div>
    </div>
  );
};

export default Front;
