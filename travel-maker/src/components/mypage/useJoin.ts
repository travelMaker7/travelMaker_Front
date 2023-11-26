import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface UpdateStatusRequest {
  joinId: number;
  joinStatus: string;
}

export const useJoin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updateStatusRequest: UpdateStatusRequest) =>
      axios.post(
        "https://sosak.store/api/v1/notification",
        updateStatusRequest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    }
  );
};
