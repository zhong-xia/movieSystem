// action的创建函数


import { IMovie, MovieService } from "../../services/MovieService";
import { IAction } from "./ActionTypes";
import { ISearchCondition, SwitchType } from "../../services/CommonTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { IRootState } from "../reducers/RootReducer";
// let a: Action

export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[]
    total: number
}>;

// 上面的代码就相当于这里的，其实一样
// type SaveMoviesAction = { 
//     type: "movie_save"
//     payload: {
//         movies: IMovie[]
//         total: number
//     }
// }

 function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_setCondition", ISearchCondition>

function SetConditionAction(condition: ISearchCondition): SetConditionAction {
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

//  从数据库中的删除
// export type DeleteAction = IAction<"movie_delete", string>

// function deleteAction(id: string): DeleteAction {
//     return {
//         type: "movie_delete",
//         payload: id
//     }
// }
export type DeleteAction = IAction<"movie_delete", string>

function deleteAction(id: string): DeleteAction {
    return {
        type: "movie_delete",
        payload: id
    }
}

export type MovieActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction | MovieChangeSwitchAction ;

// 根据条件从服务器获取电影的数据
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1.设置加载状态
        dispatch(setLoadingAction(true));
        // 2.设置条件
        dispatch(SetConditionAction(condition));
        // 3.获取服务器数据
        const curCondition = getState().movie.condition;
        const resp = await MovieService.getMovies(curCondition);
        // 4.更改仓库的数据
        dispatch(saveMoviesAction(resp.data, resp.total));
        // 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        dispatch(setLoadingAction(true));
        await MovieService.delete(id);
        // dispatch(deleteAction(id));//删除本地仓库中的数据
         dispatch(deleteAction(id));//删除本地仓库中的数据
        dispatch(setLoadingAction(false));
    }
}

export type MovieChangeSwitchAction = IAction<"movie_switch",{
    type: SwitchType
    newVal: boolean
    id: string
}>

function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitchAction  {
    return {
        type: "movie_switch",
        payload: {
            type,
            newVal,
            id
        }
    }
}


// 发送ajax请求
function changeSwitch(type: SwitchType, newVal: boolean, id: string) 
    : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
        return async dispatch => {
            dispatch(changeSwitchAction(type, newVal, id));
            await MovieService.edit(id, {
                // isHot: true
                [type]:newVal
            })
        }
    }


export default {
    saveMoviesAction,
    setLoadingAction,
    SetConditionAction,
    deleteAction,
    fetchMovies,
    deleteMovie,
    changeSwitchAction,
    changeSwitch 
}

