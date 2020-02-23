import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const HeaderBreadcumb = (props) => {
    return(<div>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Dashboard</a></BreadcrumbItem>
            <BreadcrumbItem active>{props.title}</BreadcrumbItem>
        </Breadcrumb>
        </div>
    )
}
export default HeaderBreadcumb;