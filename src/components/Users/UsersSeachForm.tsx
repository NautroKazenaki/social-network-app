import { Field, Form, Formik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { FilterType } from '../../Redux/users-reducer';
import { getUsersFilter } from '../../Redux/users-selectors';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type OwnPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

 type FormType = {
    term: string
    friend: FriendType 
}

type FriendType = 'true' | 'false' | 'null' 

export const UsersSearchForm: React.FC<OwnPropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: any, { setSubmitting }: { setSubmitting: (isSumbitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">all</option>
                            <option value="true">only friend</option>
                            <option value="false">non friendo</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
           </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})