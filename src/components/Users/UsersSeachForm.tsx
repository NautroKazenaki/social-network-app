import { Field, Form, Formik } from 'formik';
import React from 'react'
import { FilterType } from '../../Redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type OwnPropsType = {
    onFilterChanged: (filter: FilterType) => void
}



export const UsersSearchForm: React.FC<OwnPropsType> = React.memo((props) => {

    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSumbitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: null }}
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