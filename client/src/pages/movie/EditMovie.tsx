import React from "react";
import { RouteComponentProps } from "react-router";
import MovieForm from "../../components/MovieForm";
import { MovieService, IMovie } from "../../services/MovieService";

interface IParams {
    id: string
}

interface EditPageState {
    movie?: IMovie
}


export default class extends React.Component<RouteComponentProps<IParams>, EditPageState> {
    state: EditPageState = {
        movie: undefined
    }

   async componentDidMount() {
      const resp = await MovieService.getMovieById(this.props.match.params.id);
      if(resp.data){
          this.setState({
              movie: resp.data
          })
      }
   }

    render() {
        // console.log(this.props.match.params.id)//这里的属性是前面Route中的component注入的，可以通过泛型RouteComponentProps中获取,这里可以获取id
        
        
        return (
            // <h1>
            //     修改电影页
            //     { this.props.match.params.id}
            // </h1>
            <MovieForm 
            movie = {this.state.movie}
            onSubmit={async movie=>{
                const resp = await MovieService.edit(this.props.match.params.id, movie)
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