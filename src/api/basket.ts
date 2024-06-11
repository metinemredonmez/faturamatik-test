import axios from "axios"
import { apiUrl, authHeaderWithToken } from "."

export interface AddBasketProps {
    token:string
    invoices:any | []
    cardNumber?:string
}

export const addBasket =  ({
    token,
    invoices
}:AddBasketProps) => {

    let data = {
        faturalar:invoices
    }

    data: JSON.stringify(data);

    const header = authHeaderWithToken('SEPET_FATURA_EKLE', token);

    return axios.post(`${apiUrl}/sepetFatura`, data, {
        headers: header
    });
}


export const listBaskets =  ({
    token,
    cardNumber
}:AddBasketProps) => {

    let data = {
        t_sanal_pos_adi:"İşyerimPos",
        t_kart_no:cardNumber
    }

    data: JSON.stringify(data);

    const header = authHeaderWithToken('SEPET_FATURA', token);

    return axios.post(`${apiUrl}/sepetFatura`, data, {
        headers: header
    });
}

export const deleteBasket = async  ({
    token,
    id
}:any) => {

    let data = {
        t_id:id
    }

    data: JSON.stringify(data);

    const header = authHeaderWithToken('SEPET_FATURA_TEMIZLE', token);

    return axios.post(`${apiUrl}/sepetFatura`, data, {
        headers: header
    }).then(({data})=>{
        return {data};
    }).catch((error)=>{
        return {error};
    });
}


