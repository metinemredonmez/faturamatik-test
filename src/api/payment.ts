import { useLocalStorage } from "@/hooks/useLocalStorage"
import axios from "axios";
import { apiUrl, authHeaderWithToken } from ".";
import { useAuth } from "@/contexts/auth/Context";


export const companyList = ({
    token,
}: any) => {





    return axios.get(`${apiUrl}/faturaSorgulamalari`, {
        headers: authHeaderWithToken('KURUM_LISTESI', token),
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });

}

export const invoiceInquiry = ({
    token,
    company,
    referenceNumber,
    queryType,
    subscriberNumber,
}: any) => {
    let data = {
        "t_kurum": company,
        "t_sorgu_tipi": queryType,
        "t_referans_no": referenceNumber,
        "t_abone_no": subscriberNumber
    }

    data: JSON.stringify(data);

    console.log(data);

    return axios.post(`${apiUrl}/faturaSorgulamalari`, data, {
        headers: authHeaderWithToken('FATURA_SORGULA', token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });
}


export const addPayment = ({
    token,
    cardType,
    cardName,
    cardHolder,
    cardNumber,
    cardExpireMonth,
    cardExpireYear,
    cardCvv,
    cardId,
    installment,
}: any) => {

    let data = {
        t_odeme_sekli: "İşyerimPos",
        t_kart_sahibi: cardHolder,
        t_kart_tipi: cardType,
        t_kart_adi: cardName,
        t_kart_no: cardNumber,
        t_kart_id: cardId,
        t_taksit_sayisi: installment,
        t_kayit_kaynagi: "Mobil - FTM",
        son_kullanim_yil: cardExpireYear,
        son_kullanim_ay: cardExpireMonth,
        cvv_no: cardCvv
    }

    data: JSON.stringify(data);

    console.log(data);

    return axios.post(`${apiUrl}/odemeIslemleri`, data, {
        headers: authHeaderWithToken('ODEME_ISLEMLERI_EKLE', token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        console.log("e", error);
        return { error };
    });
}

export const checkPayment = ({
    token,
    OrderId
}: any) => {

    let data = {
        t_odeme_id: OrderId,
        t_sanal_pos_adi: "İşyerimPos"
    }

    data: JSON.stringify(data);

    console.log("data", data);

    return axios.post(`${apiUrl}/odemeIslemleri`, data, {
        headers: authHeaderWithToken('ODEME_ISLEMLERI_SORGULA', token)
    }).then(({ data }) => {
        console.log("d", data);
        return { data };
    }).catch((error) => {
        console.log("e", error);
        return { error };
    });
}





export const transactionList = ({
    token,
    startDate = "",
    endDate = "",

}: any) => {

    let data = {
        "t_odeme_id": "",
        "t_taksit_sayisi": "",

        "t_durum": "",

        "tarih_1": "",
        "tarih_2": "",

        "ss": 1,
        "ks": 20
    }

    data: JSON.stringify(data);

    console.log(data);

    return axios.post(`${apiUrl}/odemeIslemleri`, data, {

        headers: authHeaderWithToken('ODEME_ISLEMLERI', token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });
}


export const createReceiptQuery = async ({
    token,
    orderId
}: any) => {

    let data = {
        "t_odeme_id": orderId
    }

    data: JSON.stringify(data);

    return await axios.post(`${apiUrl}/odemeIslemleri`, data, {
        headers: authHeaderWithToken('ODEME_MAKBUZU_OLUSTUR', token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });
}

export const sendMailReceipt = async ({
    token,
    orderId,
    url
}: any) => {

    let values = {
        "t_odeme_id": orderId,
        "p_makbuz_url": url
    }

    values: JSON.stringify(values)

    console.log(values);

    return await axios.post(`${apiUrl}/odemeIslemleri`, values, {
        headers: authHeaderWithToken('ODEME_MAKBUZU_MAIL_GONDER', token)
    }).then(({ data }) => {
        return { data };
    })
        .catch((error) => {
            return { error };
        })

}