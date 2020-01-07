import React from "react";
import MovieForm from "../../components/MovieForm";
import { MovieService } from "../../services/MovieService";


export default class extends React.Component {
    render() {
        return (
            // <h1>
            //     添加电影页
            // </h1>
            <MovieForm onSubmit={async movie=>{
                const resp = await MovieService.add(movie)
                if(resp.data){
                    return "";
                }
                else{
                    return resp.err;
                }
            }}></MovieForm>
        )
    }
}