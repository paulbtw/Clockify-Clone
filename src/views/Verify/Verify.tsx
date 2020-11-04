import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { requestApi } from "../../utils/api";

interface VerifyProps {
  token: string;
}

const Verify: React.FC<VerifyProps> = ({ token }) => {
  const history = useHistory();

  useEffect(() => {
    const verifyRequest = async () => {
      try {
        const response = await requestApi(`/auth/verify/${token || ""}`, "GET");

        if (response.success) {
          history.push("/login");
          toast.success(response.message);
        } else {
          history.push("/");
          toast.error(response.message);
        }
      } catch (err) {
        history.push("/");
        console.log(err.message);
        toast.error(err.message);
      }
    };

    verifyRequest();
  });
  return <h1>Verification</h1>;
};

export default Verify;
