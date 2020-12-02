import { LayoutAdmin, Admin, AdminHeader, AdminBody, AdminSidebar, AdminContent, AdminAction } from '../';
import { Finder, FinderModule, FinderHeader, FinderTitle, FinderBody, LayoutUpload, NavPath, NavAction, FinderLayout } from '../';
import Schema from "../Schema/SchemaWithState"

import { appInbox as app } from "../../resources/data"

# Finder

## FinderLayout + FinderModule

FinderLayout with parents and FinderModule as children:

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

## FinderLayout with grid + FinderModule

FinderLayout with parents and FinderModule as children:

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

## Finder app

FinderLayout within LayoutAdmin, makes up a finder view:

<Playground>
    <LayoutAdmin app={app}>
        <FinderLayout {...app}>
            <FinderModule title="Document 1" description="description" label="Document" />
            <FinderModule title="Document 2" description="description" label="Document" />
            <FinderModule title="Document 3" description="description" label="Document" />
        </FinderLayout>
    </LayoutAdmin>
</Playground>




## Schema example

Finder layout, schema example.

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

## Static examples

Finder header + body.

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

Finder header with title and action.

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

Finder with path.

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


LayoutAdmin + FinderLayout.

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

LayoutAdmin + Finder content + action.

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

LayoutAdmin + Finder + Upload + Action.

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
