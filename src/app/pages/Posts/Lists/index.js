import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { PostsSelectLastpost } from '../../../modules/posts/posts_select_lastpost';

export default function Index() {
    const { state } = useLocation()
    const { push } = useHistory()

    const handleCLick = () => {
        if (state) {
            push({
                pathname: "/posts/newPost",
                state: {
                    id: state.id,
                    subgroup_name: state.subgroup_name
                }
           })
           return
        }
        push("/posts/newPost")
    }

    return (
        <div className="bg-white rounded-lg p-5 shadow mt-5">
            <div>
                <button
                    className="btn btn-success"
                    onClick={handleCLick}
                >
                    پست جدید
                </button>
            </div>

            <div>
                {
                    state?.subgroup_name ? (
                        <PostsSelectLastpost
                            title={state.subgroup_name}
                            paginationShow={true}
                            payload={{
                                size: "15",
                                filter: { parent_post_id: "null", subgroup_name: state.subgroup_name }
                            }}
                        />
                    ) : (
                            <PostsSelectLastpost
                                title="آخرین پست ها"
                                paginationShow={true}
                                payload={{
                                    size: "15",
                                    filter: { parent_post_id: "null" }
                                }}
                            />
                        )
                }
            </div>
        </div>
    )
}
