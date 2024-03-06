import { cookies } from "next/headers";

import Header from "@/components/shared/Header";
import { Axios } from "@/utils/Axios";
import { DateFormatterQuery } from "@/helpers/DateFormatterQuery";

const getCalculatedTips = async (token: string | undefined, date: string) => {
  const queryToken = token;

  if (!queryToken) {
    return null;
  }

  try {
    const request = await Axios.get(`auth/admin/generated-data/${date}`, {
      headers: {
        "ff-admin-token": queryToken,
      },
    });

    const response = await request.data;

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Reports = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("ff-admin-token")?.value;

  const date = DateFormatterQuery();

  const data = await getCalculatedTips(token, date);

  return (
    <div>
      <Header title="Generated Tips" />

      <h1 className="text-center my-5 font-semibold text-xl md:text-4xl">
        Calculated Tips
      </h1>

      <div className="container flex items-center justify-center">
        {data ? (
          data.map((number: number, index: number) => (
            <p
              className={`p-3 border dark:border-white border-black
              `}
              key={index}
            >
              {number}
            </p>
          ))
        ) : (
          <div>No data Found</div>
        )}
      </div>
    </div>
  );
};

export default Reports;
