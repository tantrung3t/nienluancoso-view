import * as React from 'react';
import './Themchude.css';

export default function Themchude() {


  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         "machude": null,
  //         "machudebaiviet": null,
  //         "tenchudechinh": null,
  //         "trangthai": 1

  //     }
  // }

  const [chudechinh, setChudechinh] = React.useState("cn");

  const [tenchude, setTenchude] = React.useState("");

  const uploadData = (str) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "machude": chudechinh,
      "machudebaiviet": str,
      "tenchudechinh": tenchude,
      "trangthai": 1
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3008/header/add", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    alert('Gửi thành công')
    window.location.reload()
  }




  const handleChange_Chudechinh = (event) => {
    setChudechinh(event.target.value);
  };

  const handleChange_Tenchude = (event) => {
    setTenchude(event.target.value);
  };

  const clickSend = () => {
    //cat lay ki tu dau tien trong chu
    if (tenchude === '') {
      alert("Vui lòng nhập tên chủ đề !!");
    } else {
      var str = tenchude;
      var matches = str.match(/(?<=(\s|^))[a-z]/gi);
      var acronym = matches.join('').toLowerCase();
      console.log(acronym)
      console.log(chudechinh);
      console.log(chudechinh + acronym);
      console.log(tenchude);
      uploadData(chudechinh + acronym);
    }
  }


  return (
    <div>
      <div className="form-create-news-wrap ">
        <div className="form-create-news" >
          <div className="create-news-header">Thêm chủ đề</div>

          <div className="flex-wrap m-2">
            <div className="flex-left mx-3">Chủ đề chính</div>
            {/* <input 
            list="theme" 
            className="create-news flex-right" 
            placeholder="" 
            name="txtTheme"></input>   */}
            <select id="priTheme" className="create-news-theme" onChange={handleChange_Chudechinh}>

              <option value="cn">Công nghệ</option>
              <option value="gt">Giải trí</option>
              <option value="kh">Khoa học</option>
              <option value="qs">Quân sự</option>
              <option value="tt">Thể thao</option>
            </select>
          </div>

          <div className="flex-wrap m-2">
            <div className="flex-left mx-3">Chủ đề con</div>
            <input
              type="text"
              className="create-news create-news-theme"
              placeholder="Nhập tên chủ đề"
              onChange={handleChange_Tenchude}
            ></input>

          </div>
          <div className="m-3">
            <button type="button" className="btn-create mx-2 btn btn-primary" onClick={clickSend}>Gửi</button>
            {/* <button type="reset" className="btn-create mx-2 btn btn-primary">Hủy bỏ</button> */}
          </div>
        </div>
      </div>

      {/* <div className="chude-padding">
                <div className="chude-title">Chọn chủ đề</div>
                <select className="selected" onChange={handleChange_Chudechinh}>
                    <option value="cn">Công nghệ</option>
                    <option value="gt">Giải trí</option>
                    <option value="kh">Khoa học</option>
                    <option value="qs">Quân sự</option>
                    <option value="tt">Thể thao</option>
                </select>
            </div>

            <div className="chude-padding">
                <div className="chude-title">Tên chủ đề</div>
                <input type="text" className="chude-input" onChange={handleChange_Tenchude}></input>
            </div>

            <button onClick={clickSend}>Gửi</button>*/}
    </div>

  )
}


