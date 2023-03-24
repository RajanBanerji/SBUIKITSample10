import { Rings } from "react-loader-spinner";

export default function CustomLoader() {
  return (
    <div className="custom-loader">
      <div className="loader-wrap">
        <Rings
          heigth="100"
          width="100"
          color="grey"
          ariaLabel="loading-indicator"
        />
      </div>
    </div>
  );
}
