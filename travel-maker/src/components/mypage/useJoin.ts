import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateStatusRequest {
  joinId: number;
  joinStatus: string;
  overWish: boolean;
}

export const useJoin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updateStatusRequest: UpdateStatusRequest) =>
      axios.post(
        "https://sosak.store/api/v1/accompany/host",
        updateStatusRequest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      ),
    {
      onSuccess: (response) => {
        console.log("response", response);
        queryClient.invalidateQueries("notifications");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
};
