import { useContext, useEffect, useState} from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { baseUrl, postRequest } from '../../utils/service';

const verifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ SearchParams, setSearchParams ] = useSearchParams();
  const navigate = useNavigate();
  
  const emailToken = SearchParams.get("emailToken");

  console.log(user);
  console.log("EmailToken", emailToken);

  useEffect(() => {
    ( async () => {
        if ( user?.isVerified) {
            setTimeout(() => {
                return navigate("/")
            }, 3000);
        } else {
            if ( emailToken ) {
                //post request
                setIsLoading(true);

                const response = await postRequest (
                    `${baseUrl}/user/verify-email`,
                    JSON.stringify({ emailToken })
                );

                setIsLoading(false);
                console.log("res", response);

                if (response.error) {
                    return setError(response);
                }
                // neu email chua verified thi updateUser 
                updateUser(response); //responese lay userData tu backend (id, name, email, token, isVerified)
            }
        }
    })();
  }, [emailToken, user]);
  return (
    <div>
        { isLoading ? (
            <div>
                <CircularProgress />
            </div>
        ) : (
            <div>
                {user?.isVerified ? (
                    <div>
                        <Alert severity='success'>
                            Email successfully verified, redirecting...
                        </Alert>
                    </div>
                ) : (
                    <div>
                        {error.error? (
                            <Alert severity='error'>
                                {error.message}
                            </Alert>
                        ) : null}
                    </div>
                )}
            </div>
        )}
    </div>
  );
};


export default verifyEmail;