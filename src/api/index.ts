export const apiUrl = "https://crm.ortakmarketim.com/wapi-v2/uye";

export const blogUrl = "https://crm.ortakmarketim.com/wapi/admin/blogYazilari";

export const sliderUrl = "https://crm.ortakmarketim.com/wapi/admin/bannerKayitlari";

export const dijiyonApiUrl = 'https://api.dijiyon.com';

export const distributor_id = 1;

export const oldHeader = () => {
    return {
        "project_token": "2MQSzuQQb4DBH6ADSBwyZGRtVH4dsKZEtmsphdHMRvgYX9g33h",
        "islem": "BLOG_YAZILARI_MOBIL",
        "Content-Type": "text/plain"
    }
}
export const oldHeaderSlider = () => {
    return {
        "project_token": "2MQSzuQQb4DBH6ADSBwyZGRtVH4dsKZEtmsphdHMRvgYX9g33h",
        "islem": "BANNER_KAYITLARI",
        "Content-Type": "text/plain"
    }
}

export interface ApiModel {
    endPoint: string,
    data?: any
}

export const authHeader = ({
    action,
    project_token,
    distributor_id,
}: any) => {
    return {
        islem: action,
        project_token,
        distributor_id,


    }
}

export const formHeader = (action: any) => {
    return {
        "Content-Type": "text/plain",
        "distributor_id": distributor_id,
        "project_token": "misYqBlz6pgz9nSBXrYfA8DnDmLXZzGT1jh7WzG82NpICr0MHg",
        "islem": action,
    }
}

export const authHeaderWithToken = (action: string, token: string) => {
    return {
        "Content-Type": "text/plain",
        "distributor_id": distributor_id,
        "project_token": "misYqBlz6pgz9nSBXrYfA8DnDmLXZzGT1jh7WzG82NpICr0MHg",
        "islem": action,
        "user_token": token,
    }
}


export const apiPost = async ({ endPoint, data }: ApiModel) => {

}

export const apiGet = async ({ endPoint }: ApiModel) => {

}

export const apiPut = async ({ endPoint, data }: ApiModel) => {

}