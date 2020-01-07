import React from "react";
import { Upload, Icon, message, Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { IResponseError, IResponseData } from "../services/CommonTypes";

interface IImgUploaderProps {
    value?: string
    onChange?: (imgUrl: string) => void
}

interface IImgState {
    showModal: boolean
}

export default class extends React.Component<IImgUploaderProps> {

    // 展示组件可以有状态，可以使用接口的方式进行约束
    state: IImgState = {
        showModal: false
    }

    private getUploadContent(){
        if(this.props.value){
            return null;
        }
        else{
            return (
                <div>
                    <Icon type="plus"/>
                    <div>点击上传</div>
                </div>
            );
        }
    }

    private getFileList(): UploadFile[] {
        if(this.props.value) {
            return [
                {
                    uid: this.props.value,
                    name: this.props.value,
                    url: this.props.value
                }
            ]
        }
        return []
    }

//   handleChange(info){
//       console.log(info)
//   }//这种方法不好，有坑，只能返回一个值

// 下面这个方法可以，手动处理请求，拿数据
async handleRequest(p: any){
    // console.log(p)
    let formData = new FormData();
    formData.append(p.filename, p.file);
    // fetch api
    const request = new Request(p.action, {
        method: "post",
        body: formData
    });
    const resp: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json());
    // console.log(resp);
    if(resp.err) {
        // 有错误
        message.error("上传失败!");
    }
    else{
        // 触发回调
        if(this.props.onChange){
            this.props.onChange(resp.data!);
        }    
    }
}

    render(){
        return (
            // 文件名不匹配Unexpected field 修改name
            // 文件类型
        <div>
            <Upload
                action="/api/upload"
                name="imgfile"
                accept=".jpg,.png,.gif"
                listType="picture-card"
                fileList={this.getFileList()}
                // onChange={this.handleChange.bind(this)}
                customRequest={this.handleRequest.bind(this)}
                // 删除图片
                onRemove={()=>{
                    if(this.props.onChange){
                        this.props.onChange("")
                    }                    
                }}
                // 预览
              onPreview={()=>{
                //   console.log("预览")
                this.setState({
                    showModal: true
                })
              }}
            >
                {/* <div>
                    <Icon type="plus"/>
                    <div>点击上传</div>
                </div> */}
                {this.getUploadContent()}
            </Upload>
            <Modal visible={this.state.showModal} footer={null} onCancel={()=>{
                this.setState({
                    showModal: false
                })
            }}>
                <img src={this.props.value} alt="" style={{width:'100%'}}/>
            </Modal>
            </div>
        )
    }
}