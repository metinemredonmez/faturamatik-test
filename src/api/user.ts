import axios from "axios"
import { apiUrl, authHeader, authHeaderWithToken, formHeader } from "."
import { Platform } from "react-native"

export const login = async ({
    username,
    password,
}: any) => {

    let values = {
        "t_cihaz_tipi": Platform.OS,
        "t_cihaz_token": "xxxx-xxxx-xxxx-xxxx-xxxx",
        "t_kayit_kaynagi": "Mobil - FTM",
        "kullanici_adi": username,
        "sifre": password,
    }

    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeGirisKayitlari`, values, {
        headers: formHeader("UYE_GIRIS_KAYITLARI_GIRIS"),
    })

        .then(({ data }) => {

            return { data };
        })
        .catch((error) => {
            return { error };
        });
}

export const loginWithToken = async ({
    code,
    token,
}: any) => {
    let values = {
        "t_sms_onay_kodu": code
    }

    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeGirisKayitlari`, values, {
        headers: {
            ...formHeader("UYE_GIRIS_KAYITLARI_GIRIS_ONAY"),
            user_token: token,
        }
    })
        .then(({ data }) => {
            return { data };
        })
        .catch((error) => {
            return { error };
        });
}

export const checkTc = async ({
    id,
    birthDate
}: any) => {

    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate
    }

    values: JSON.stringify(values)



    return axios.post(`${apiUrl}/tcNoSorgulamalari`, values, {
        headers: formHeader("TC_NO_SORGULA"),
    })
        .then(({ data }) => {
            return { data };
        })
        .catch((error) => {
            return { error };
        });
}

export const sendSmsForgotPassword = async ({
    id,
    birthDate
}: any) => {

    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate
    }

    values: JSON.stringify(values)



    return axios.post(`${apiUrl}/uyeSifreKayitlari`, values, {
        headers: formHeader("UYE_SIFRE_KAYITLARI_SMS_ONAYI_GONDER"),
    })
        .then(({ data }) => {
            return { data };
        })
        .catch((error) => {
            return { error };
        });
}


export const checkResetPasswordCode = async ({
    id,
    birthDate,
    code
}: any) => {

    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate,
        "eski_sifre": code
    }

    values: JSON.stringify(values)



    return axios.post(`${apiUrl}/uyeSifreKayitlari`, values, {
        headers: formHeader("UYE_SIFRE_KAYITLARI_SMS_ONAYI_DOGRULAMA"),
    })
        .then(({ data }) => {
            return { data };
        })
        .catch((error) => {
            return { error };
        });
}




export const register = async ({
    name,
    surname,
    email,
    phone,
    password,
    id,
    birthDate,
    gender,


}: any) => {
    let data = {
        t_kayit_kaynagi: "Mobil - FTM",
        t_kayit_tipi: "Bireysel",
        t_ad: name,
        t_soyad: surname,
        t_tc_no: id,
        t_gsm_no: `0${phone}`,
        t_mail_adresi: email,
        t_dogum_tarihi: birthDate.split(".").reverse().join("-"),
        t_cinsiyet: gender,
        t_ticari_unvan: "",
        t_bildirim_mobil: 1,
        t_bildirim_mail: 1,
        t_bildirim_sms: 1,
        sifre: password,

    }

    data: JSON.stringify(data);



    return axios.post(`${apiUrl}/uyeKayitlari`, data, {
        headers: formHeader("UYE_KAYITLARI_EKLE"),
    })
        .then(({ data }) => {
            return { data };
        })
        .catch((error) => {
            return { error };
        });


}

export const logout = async () => {

}

export const sendSmsConfirmation = async ({
    id,
    birthDate,
}: any) => {
    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate.split(".").reverse().join("-")
    }

    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeKayitlari`, values, {
        headers: formHeader("UYE_KAYITLARI_SMS_ONAYI_GONDER"),
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });


}

export const checkRegisterSms = async ({
    id,
    birthDate,
    code,
}: any) => {

    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate.split(".").reverse().join("-"),
        "t_sms_onay_kodu": code
    }

    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeKayitlari`, values, {
        headers: formHeader("UYE_KAYITLARI_SMS_ONAYI_KAYDET"),
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });


}


export const changeForgotPassword = async ({
    id,
    birthDate,
    code,
    password,
}: any) => {

    let values = {
        "t_tc_no": id,
        "t_dogum_tarihi": birthDate,
        "eski_sifre": code,
        "yeni_sifre": password
    }

    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeSifreKayitlari`, values, {
        headers: formHeader("UYE_SIFRE_KAYITLARI_SMS_ONAYI_KAYDET"),
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });


}

export const getUser = async ({
    token,
}: any) => {

    return axios.get(`${apiUrl}/uyeKayitlari`, {
        headers: authHeaderWithToken("UYE_KAYITLARI_GETIR", token),
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    });

}

export const updateUser = async ({
    token,
    phone,
    email,
    mobileNotification,
    mailNotification,
    smsNotification,
}: any) => {

    let values = {
        "t_gsm_no": phone,
        "t_mail_adresi": email,
        "t_bildirim_mobil": mobileNotification,
        "t_bildirim_mail": mailNotification,
        "t_bildirim_sms": smsNotification,
    }



    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/uyeKayitlari`, values, {
        headers: authHeaderWithToken('UYE_KAYITLARI_DUZENLE', token)
    }).then(({ data }) => {
        console.log(data);
        return { data };
    }).catch((error) => {
        console.log(error);
        return { error };
    });

}

export const savedTransactions = async ({
    token,
}: any) => {

    return axios.get(`${apiUrl}/kayitliFaturaSorgulamalari`, {
        headers: authHeaderWithToken("KAYITLI_FATURA_SORGULAMALARI", token),
    }).then(({ data }) => {
        return { data };
    }
    ).catch((error) => {
        return { error };
    }
    );

}

export const addNewTransaction = async ({
    token,
    title,
    company,
    subscriptionNumber,
    mobileNotification,
    mailNotification,
    smsNotification
}: any) => {

    let values = {
        "t_baslik": title,
        "t_kurum": company,
        "t_abone_no": subscriptionNumber,
        "t_bildirim_mobil": mobileNotification,
        "t_bildirim_mail": mailNotification,
        "t_bildirim_sms": smsNotification,
        "t_sorgu_tipi": "AboneNo"
    }



    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/kayitliFaturaSorgulamalari`, values, {
        headers: authHeaderWithToken("KAYITLI_FATURA_SORGULAMALARI_EKLE", token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    })

}

export const updateTransaction = async ({
    token,
    title,
    mobileNotification,
    mailNotification,
    smsNotification,
    id
}: any) => {

    let values = {
        "t_baslik": title,
        "t_bildirim_mobil": mobileNotification,
        "t_bildirim_mail": mailNotification,
        "t_bildirim_sms": smsNotification,
        "eski_id": id,

    }



    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/kayitliFaturaSorgulamalari`, values, {
        headers: authHeaderWithToken("KAYITLI_FATURA_SORGULAMALARI_DUZENLE", token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    })

}
export const deleteTransaction = async ({
    token,

    id
}: any) => {

    let values = {
        "eski_id": id,

    }



    values: JSON.stringify(values)

    return axios.post(`${apiUrl}/kayitliFaturaSorgulamalari`, values, {
        headers: authHeaderWithToken("KAYITLI_FATURA_SORGULAMALARI_SIL", token)
    }).then(({ data }) => {
        return { data };
    }).catch((error) => {
        return { error };
    })

}

export const updateFcmToken = async ({ fcmToken, token }: any) => {
    let values = {
        "t_cihaz_token": fcmToken,
    }

    console.log(values, "values", token, "token");

    values: JSON.stringify(values)


    return axios.post(`${apiUrl}/uyeGirisKayitlari`, values, {
        headers: authHeaderWithToken("UYE_GIRIS_KAYITLARI_CIHAZ_TOKEN_DUZENLE", token),
    })

        .then(({ data }) => {

            return { data };
        })
        .catch((error) => {
            return { error };
        });
}