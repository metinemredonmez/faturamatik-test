import axios from 'axios';
import {apiUrl, authHeaderWithToken, blogUrl, distributor_id} from '.';

export const posts = async () => {
  return axios
    .post(
      `${apiUrl}/blogYazilari`,
      JSON.stringify({
        ks: '3',
      }),
      {
        headers: authHeaderWithToken('BLOG_YAZILARI_ANASAYFA', 'true'),
      },
    )
    .then(({data}) => {
      console.log('data', data);
      console.log(blogUrl);
      return {data};
    })
    .catch(error => {
      return {error};
    });
};

export const slider = async () => {
  return axios
    .get(`${apiUrl}/bannerKayitlari`, {
      headers: authHeaderWithToken('BANNER_KAYITLARI', '1'),
    })
    .then(({data}) => {
      console.log('data', data);
      return {data};
    })
    .catch(error => {
      return {error};
    });
};

export const applicationProcess = async () => {
  return axios
    .post(`${apiUrl}/basvuruPaketleri`, JSON.stringify({}), {
      headers: {
        distributor_id: distributor_id,
        project_token: 'misYqBlz6pgz9nSBXrYfA8DnDmLXZzGT1jh7WzG82NpICr0MHg',
        islem: 'BASVURU_PAKETLERI',
        'Content-Type': 'text/plain',
      },
    })
    .then(({data}) => {
      console.log('data', data);
      return {data};
    })
    .catch(error => {
      return {error};
    });
};

export const applicationHandle = async ({
  token,
  t_paket_id,
  t_basvuru_notu,
  t_ad,
  t_soyad,
  t_tc_no,
  t_gsm_no,
  t_mail_adresi,
}: any) => {
  let data = {
    t_paket_id: t_paket_id,

    t_kayit_kaynagi: 'Mobil - FTM',
    t_basvuru_notu: t_basvuru_notu,

    t_ad: t_ad,
    t_soyad: t_soyad,
    t_tc_no: t_tc_no,
    t_gsm_no: t_gsm_no,
    t_mail_adresi: t_mail_adresi,
  };
  return axios
    .post(`${apiUrl}/paketBasvurulari`, JSON.stringify(data), {
      headers: authHeaderWithToken('PAKET_BASVURULARI_EKLE', token),
    })
    .then(({data}) => {
      return {data};
    })
    .catch(error => {
      return {error};
    });
};
