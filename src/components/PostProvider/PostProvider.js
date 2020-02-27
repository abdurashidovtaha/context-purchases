import React, { useReducer, } from 'react';
import PostContext from '../../contexts/Contexts';
import { FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_CHANGE_FIELD, EDIT_POST_CANCEL, EDIT_EXISTING_POST, REMOVE_POST_FIRST, REMOVE_POST_CANCEL, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_ERROR, ADD_TO_TOTAL_SUM, SUBTRACT_FROM_TOTAL_SUM, SHOW_DESCRIPTION, SHOW_DESCRIPTION_REQUEST, SHOW_DESCRIPTION_SUCCESS, SHOW_DESCRIPTION_FAILURE, CHANGE_TOTAL_SUM } from '../../actions/actionTypes';

const initialState = {
    posts: {
        items: [],
        loading: false,
        error: null,
    },
    editedPost: {
        item: {
            id: 0,
            price: "",
            category: "food",
            description: ""
        },
        loading: false,
        error: null,
    },
    removedPost: {
        id: 0,
        loading: false,
        error: null,
    },
    description: {
        id: 0,
        value: "",
        loading: false,
        error: null,
    },
    totalSum: 0,
};

function postsReducer(prevPosts, action) {
    switch (action.type) {
        case FETCH_POST_REQUEST:
            return { ...prevPosts, loading: true, error: null };
        case FETCH_POST_SUCCESS:
            return { items: action.payload.posts, loading: false, error: null };
        case FETCH_POST_FAILURE:
            return { ...prevPosts, loading: false, error: action.payload.error };
        default:
            return prevPosts;
    }
}

function editPostReducer(prevPost, action) {
    switch (action.type) {
        case EDIT_POST_CHANGE_FIELD:
            return { ...prevPost, item: { ...prevPost.item, [action.payload.name]: action.payload.value } };
        case EDIT_POST_REQUEST:
            return { ...prevPost, loading: true, error: null };
        case EDIT_POST_SUCCESS:
            return { item: { id: 0, price: "", category: "Food", description: "" }, loading: false, error: null };
        case EDIT_POST_FAILURE:
            return { ...prevPost, loading: false, error: action.payload.error };
        case EDIT_POST_CANCEL:
            return { item: { id: 0, price: "", category: "Food", description: "" }, loading: false, error: null };
        case EDIT_EXISTING_POST:
            return { item: { ...action.payload.item }, loading: false, error: null };
        default:
            return prevPost;
    }
}

function removePostReducer(prevPost, action) {
    switch (action.type) {
        case REMOVE_POST_FIRST:
            return { id: action.payload.id, loading: false, error: null };
        case REMOVE_POST_CANCEL:
            return { id: 0, loading: false, error: null };
        case REMOVE_POST_REQUEST:
            return { ...prevPost, loading: true, error: null };
        case REMOVE_POST_SUCCESS:
            return { id: 0, loading: false, error: null };
        case REMOVE_POST_ERROR:
            return { ...prevPost, loading: false, error: action.payload.error }
        default:
            return prevPost;
    }
}

function totalSumReducer(totalSum, action) {
    switch (action.type) {
        case ADD_TO_TOTAL_SUM:
            return totalSum + action.payload.price;
        case SUBTRACT_FROM_TOTAL_SUM:
            return totalSum - action.payload.price;
        case CHANGE_TOTAL_SUM:
            return totalSum + action.payload.price 
        default:
            return totalSum
    }
}

function descriptionReducer(prevDesc, action) {
    switch (action.type) {
        case SHOW_DESCRIPTION_REQUEST:
            console.log("req");
            return { ...prevDesc, loading: true, error: null };
        case SHOW_DESCRIPTION_SUCCESS:
            return { ...prevDesc, id: action.payload.id, value: action.payload.desc, loading: false, error: null };
        case SHOW_DESCRIPTION_FAILURE:
            console.log("fai");
            return { ...prevDesc, loading: false, error: action.payload.error };
        default:
            return prevDesc;
    }
}

function reducer(prevState, action) {
    switch (action.type) {
        case FETCH_POST_REQUEST:
        case FETCH_POST_SUCCESS:
        case FETCH_POST_FAILURE:
            return { ...prevState, posts: postsReducer(prevState.posts, action) };
        case EDIT_POST_CHANGE_FIELD:
        case EDIT_POST_REQUEST:
        case EDIT_POST_SUCCESS:
        case EDIT_POST_FAILURE:
        case EDIT_POST_CANCEL:
        case EDIT_EXISTING_POST:
            return { ...prevState, editedPost: editPostReducer(prevState.editedPost, action) };
        case REMOVE_POST_FIRST:
        case REMOVE_POST_CANCEL:
        case REMOVE_POST_REQUEST:
        case REMOVE_POST_SUCCESS:
        case REMOVE_POST_ERROR:
            return { ...prevState, removedPost: removePostReducer(prevState.removedPost, action) };
        case ADD_TO_TOTAL_SUM:
        case SUBTRACT_FROM_TOTAL_SUM:
        case CHANGE_TOTAL_SUM:
            return { ...prevState, totalSum: totalSumReducer(prevState.totalSum, action) };
        case SHOW_DESCRIPTION_REQUEST:
        case SHOW_DESCRIPTION_SUCCESS:
        case SHOW_DESCRIPTION_FAILURE:
            return { ...prevState, description: descriptionReducer(prevState.description, action) };
        default:
            return prevState;
    }
}

export default function PostProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PostContext.Provider>
    )
}
