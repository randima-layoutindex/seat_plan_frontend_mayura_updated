
import axios from "axios";
export const seats = (paramsData) => {
    let url = "http://127.0.0.1:3000/organizations/finOneByParams";
    console.log(paramsData.accessCode,paramsData.showTimeId)
  
    return axios(url, {
      method: "GET",
      // params: { ...query },
      params: {
        accessCode: paramsData.accessCode,
        showTimeId: paramsData.showTimeId,
        //   name: paramsData.name,
        //   city: paramsData.city,
        //   brandname: paramsData.brandname,
        //   Device: paramsData.Device,
        //   "price[gte]": paramsData.priceMin,
        //   "price[lte]": paramsData.priceMax,
        //   sort: paramsData.sort,
      },
    })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };