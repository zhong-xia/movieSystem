import React, { Dispatch } from "react";
import MovieTable, { IMovieTableEvents } from "../../components/MovieTable";
import { connect } from "react-redux";
import { IRootState } from "../../redux/reducers/RootReducer";
import { IMovieState } from "../../redux/reducers/MovieReducer";
import MovieAction, { MovieActions } from "../../redux/actions/MovieAction";

function mapStateToProps(state: IRootState): IMovieState {
    return state.movie;
}

// 高阶组件
// const HOC = connect(mapStateToProps)
// const MovieContainer = HOC(MovieTable);
// const MovieContainer = connect(mapStateToProps)(MovieTable)

// export default class extends React.Component {
//     render() {
//         return (
//             <h1>
//                 <MovieContainer/>
//             </h1>
//         )
//     }
// }


function mapDispatchToProps(dispatch: Dispatch<any>): IMovieTableEvents{
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key:""
            }))
        },
        onSwitchChange(type, newState, id) {
            // dispatch(MovieAction.changeSwitchAction(type, newState, id));
            dispatch(MovieAction.changeSwitch(type, newState, id));
        },
        async onDelete(id) {
            await dispatch(MovieAction.deleteMovie(id))
        },
        onChange(newPage) {
            dispatch(MovieAction.fetchMovies({
                page: newPage
            }))
        },
        onKeyChange(key){
            dispatch(MovieAction.SetConditionAction({
                key
            }))
        },
        onSearch(){
            dispatch(MovieAction.fetchMovies({
                page: 1
            }))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MovieTable)