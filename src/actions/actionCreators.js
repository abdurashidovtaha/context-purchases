import { FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_CHANGE_FIELD, EDIT_POST_CANCEL, EDIT_EXISTING_POST, REMOVE_POST_FIRST, REMOVE_POST_CANCEL, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_ERROR, ADD_TO_TOTAL_SUM, SUBTRACT_FROM_TOTAL_SUM, SHOW_DESCRIPTION_REQUEST, SHOW_DESCRIPTION_SUCCESS, SHOW_DESCRIPTION_FAILURE, CHANGE_TOTAL_SUM } from "./actionTypes";

export function fetchPostRequest() {
    return {
        type: FETCH_POST_REQUEST,
        payload: {}
    }
}

export function fetchPostSuccess(posts) {
    return {
        type: FETCH_POST_SUCCESS,
        payload: {
            posts,
        }
    }
}

export function fetchPostFailure(error) {
    return {
        type: FETCH_POST_FAILURE,
        payload: {
            error,
        }
    }
}

export async function getAllPosts(dispatch) {
    dispatch(fetchPostRequest());
    try {
        const response = await fetch("https://requeststaha.herokuapp.com/api/posts");
        if (!response.ok) {
            throw new Error("Wrong Request");
        }
        const posts = await response.json();
        dispatch(fetchPostSuccess(posts));
    } catch (e) {
        dispatch(fetchPostFailure(e));
        throw e;
    }
}

export async function editPost(dispatch, item) {
    dispatch(editPostRequest());
    try {
        const response = await fetch("https://requeststaha.herokuapp.com/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error("error");
        }
        dispatch(editPostSuccess());
    } catch (e) {
        dispatch(editPostFailure(e));
        throw e;
    }
}

export function editPostRequest() {
    return {
        type: EDIT_POST_REQUEST,
        payload: {}
    }
}

export function editPostSuccess() {
    return {
        type: EDIT_POST_SUCCESS,
        payload: {}
    }
}

export function editPostFailure(error) {
    return {
        type: EDIT_POST_FAILURE,
        payload: {
            error,
        }
    };
}

export function editPostChangeField(name, value) {
    return {
        type: EDIT_POST_CHANGE_FIELD,
        payload: {
            name,
            value,
        }
    }
}

export function editPostCancel() {
    return {
        type: EDIT_POST_CANCEL,
        payload: {}
    }
}

export function editExistingPost(item) {
    return {
        type: EDIT_EXISTING_POST,
        payload: {
            item,
        }
    }
}

export function removePostFirst(id) {
    return {
        type: REMOVE_POST_FIRST,
        payload: {
            id,
        }
    }
}

export function removePostCancel() {
    return {
        type: REMOVE_POST_CANCEL,
        payload: {}
    }
}

export async function removePostById(dispatch, id) {
    dispatch(removePostRequest());
    try {
        const response = await fetch(`https://requeststaha.herokuapp.com/api/posts/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("error");
        }
        dispatch(removePostSuccess());
    } catch (e) {
        dispatch(removePostError(e));
    }
}

export function removePostRequest() {
    return {
        type: REMOVE_POST_REQUEST,
        payload: {}
    }
}

export function removePostSuccess() {
    return {
        type: REMOVE_POST_SUCCESS,
        payload: {}
    }
}

export function removePostError(error) {
    return {
        type: REMOVE_POST_ERROR,
        payload: {
            error,
        }
    }
}

export function addToTotalSum(price) {
    return {
        type: ADD_TO_TOTAL_SUM,
        payload: {
            price,
        }
    }
}

export function subtractFromTotalSum(price) {
    return {
        type: SUBTRACT_FROM_TOTAL_SUM,
        payload: {
            price,
        }
    }
}

export function changeTotalSum(initialPrice, newPrice) {
    return {
        type: CHANGE_TOTAL_SUM,
        payload: {
            price: newPrice - initialPrice,
        }
    }
}

export async function showDescription(dispatch, id) {
    dispatch(showDescriptionRequest());
    try {
        const response = await fetch(`https://requeststaha.herokuapp.com/api/posts/desc/${id}`);
        if (!response.ok) {
            console.log("help me2");
            throw new Error("error");
        }
        const desc = await response.text();
        console.log(desc);
        dispatch(showDescriptionSuccesss(id, desc))
    } catch (e) {
        dispatch(showDescriptionFailure(e));
    }
}

export function showDescriptionRequest() {
    return {
        type: SHOW_DESCRIPTION_REQUEST,
        payload: {}
    }
}

export function showDescriptionSuccesss(id, desc) {
    return {
        type: SHOW_DESCRIPTION_SUCCESS,
        payload: {
            id,
            desc,
        }
    }
}

export function showDescriptionFailure(error) {
    return {
        type: SHOW_DESCRIPTION_FAILURE,
        payload: {
            error,
        }
    }
}