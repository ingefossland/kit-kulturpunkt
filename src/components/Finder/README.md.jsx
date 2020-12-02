import React from 'react'
import { Playground, LayoutWindow as Window, LayoutCode as Code } from '@frontend-components/styleguide/lib/components/'
import { Props, Methods } from './../../.styleguide/utils.js'
import { MDXTag } from '@mdx-js/tag'
import { LayoutAdmin, Admin, AdminHeader, AdminBody, AdminSidebar, AdminContent, AdminAction } from '../';
import { Finder, FinderModule, FinderHeader, FinderTitle, FinderBody, LayoutUpload, NavPath, NavAction, FinderLayout } from '../';
import Schema from "../Schema/SchemaWithState"
import { appInbox as app } from "../../resources/data"

const layoutProps = {
  
};
export default class MDXContent extends React.Component {
  constructor(props) {
    super(props)
    this.layout = null
  }
  render() {
    const { components, ...props } = this.props

    return <MDXTag
             name="wrapper"
             
             components={components}>

<MDXTag name="h1" components={components}>{`Finder`}</MDXTag>
<MDXTag name="h2" components={components}>{`FinderLayout + FinderModule`}</MDXTag>
<MDXTag name="p" components={components}>{`FinderLayout with parents and FinderModule as children:`}</MDXTag>
<Playground>
    <FinderLayout parents={
        [
            {"title":"App"},
            {"title":"Parent"},
            {"title":"Page"}
        ]
    }>
        <FinderModule title="Document 1" description="description" label="Document" />
        <FinderModule title="Document 2" description="description" label="Document" />
        <FinderModule title="Document 3" description="description" label="Document" />
    </FinderLayout>
</Playground>
<MDXTag name="h2" components={components}>{`FinderLayout with grid + FinderModule`}</MDXTag>
<MDXTag name="p" components={components}>{`FinderLayout with parents and FinderModule as children:`}</MDXTag>
<Playground>
    <FinderLayout layout="grid" 
        parents={
        [
            {"title":"App"},
            {"title":"Parent"},
            {"title":"Page"}
        ]
    }>
        <FinderModule title="Document 1" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 2" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 3" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 1" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 2" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 3" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 1" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 2" description="description" label="Document" moduleLayout="grid" />
        <FinderModule title="Document 3" description="description" label="Document" moduleLayout="grid" />
    </FinderLayout>
</Playground>
<MDXTag name="h2" components={components}>{`Finder app`}</MDXTag>
<MDXTag name="p" components={components}>{`FinderLayout within LayoutAdmin, makes up a finder view:`}</MDXTag>
<Playground>
    <LayoutAdmin app={app}>
        <FinderLayout {...app}>
            <FinderModule title="Document 1" description="description" label="Document" />
            <FinderModule title="Document 2" description="description" label="Document" />
            <FinderModule title="Document 3" description="description" label="Document" />
        </FinderLayout>
    </LayoutAdmin>
</Playground>
<MDXTag name="h2" components={components}>{`Schema example`}</MDXTag>
<MDXTag name="p" components={components}>{`Finder layout, schema example.`}</MDXTag>
<Playground>
   <Schema schema={{
        "type": "object",
        "properties": {
            "default": {
                "type": "object",
                "properties": {
                    "text": {
                        "type": "string"
                    },
                    "switch": {
                        "type": "boolean"
                    }
                }
            }
        }
        
    }} 
    uiSchema={{
        "default": {
            "ui:layout": "finder",
        }
    }}
    />
</Playground>
<MDXTag name="h2" components={components}>{`Static examples`}</MDXTag>
<MDXTag name="p" components={components}>{`Finder header + body.`}</MDXTag>
<Playground>
  <Finder>
    <FinderHeader>
      .finder__header
    </FinderHeader>
    <FinderBody>
      .finder__body
    </FinderBody>
  </Finder>
</Playground>
<MDXTag name="p" components={components}>{`Finder header with title and action.`}</MDXTag>
<Playground>
  <Finder>
    <FinderHeader>
        <FinderTitle title="Title" />
        <NavAction button={{ title: "Submit"}} />
    </FinderHeader>
    <FinderBody>
      .finder__body
    </FinderBody>
  </Finder>
</Playground>
<MDXTag name="p" components={components}>{`Finder with path.`}</MDXTag>
<Playground>
  <Finder>
    <FinderHeader>
        <NavPath parents={[
            {
                title: "Grandparent"
            },
            {
                title: "Parent"
            }
        ]} />
    </FinderHeader>
    <FinderBody>
      .finder__body
    </FinderBody>
  </Finder>
</Playground>
<MDXTag name="p" components={components}>{`LayoutAdmin + FinderLayout.`}</MDXTag>
<Playground>
  <Admin>
    <AdminHeader>
      .admin__header
    </AdminHeader>
    <AdminBody>
      <AdminSidebar>
      .admin__sidebar
      </AdminSidebar>
      <AdminContent>
        <Finder>
          <FinderHeader>
            .finder__header
          </FinderHeader>
          <FinderBody>
            .finder__body
          </FinderBody>
        </Finder>
      </AdminContent>
    </AdminBody>
  </Admin>
</Playground>
<MDXTag name="p" components={components}>{`LayoutAdmin + Finder content + action.`}</MDXTag>
<Playground>
  <Admin>
    <AdminHeader>
      .admin__header
    </AdminHeader>
    <AdminBody>
      <AdminSidebar expanded={ false }>
        .admin__sidebar
      </AdminSidebar>
      <AdminContent expanded={ false }>
        <FinderLayout title="Content">
            .admin__content
        </FinderLayout>
      </AdminContent>
      <AdminAction expanded={ true }>
        <FinderLayout title="Action">
            .admin__action
        </FinderLayout>
      </AdminAction>
    </AdminBody>
  </Admin>
</Playground>
<MDXTag name="p" components={components}>{`LayoutAdmin + Finder + Upload + Action.`}</MDXTag>
<Playground>
  <Admin>
    <AdminHeader>
      .admin__header
    </AdminHeader>
    <AdminBody>
      <AdminSidebar expanded={ false }>
        .admin__sidebar
      </AdminSidebar>
      <AdminContent expanded={ false }>
        <LayoutUpload />
      </AdminContent>
      <AdminAction expanded={ true }>
        .admin__action
      </AdminAction>
    </AdminBody>
  </Admin>
</Playground>
           </MDXTag>
  }
}