import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import DetailAction from './DetailAction';
import { useRequest } from 'ahooks';
import { Route, RouteDetail, createRouteApi, createRouteDetailApi, getRouteDetailByRouteId, updateRouteOrders } from '../../../apis/route';
import { getDataFnFactory } from '../../../utils/factory';
import { CreateForm } from '../../../components/CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { incremented } from '../../../store/route';
import { RouteDetailForm } from './constants';

// 根据以下数据
// const data = [
//   {
//     "detail_id": 6,
//     "route_id": 4,
//     "station_id": 1,
//     "station_order": 0,
//     "created_at": "2025-03-15T10:51:15.914Z",
//     "updated_at": "2025-03-15T10:51:15.914Z",
//     "route": {
//       "route_id": 4,
//       "route_name": "新路线1",
//       "created_at": "2025-03-15T08:19:58.609Z",
//       "updated_at": "2025-03-15T08:19:58.609Z"
//     }
//   },
//   {
//     "detail_id": 7,
//     "route_id": 4,
//     "station_id": 2,
//     "station_order": 1,
//     "created_at": "2025-03-15T10:51:21.718Z",
//     "updated_at": "2025-03-15T10:51:21.718Z",
//     "route": {
//       "route_id": 4,
//       "route_name": "新路线1",
//       "created_at": "2025-03-15T08:19:58.609Z",
//       "updated_at": "2025-03-15T08:19:58.609Z"
//     }
//   }
// ]
// 生成以下格式

const columns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    search: false,
    className: 'drag-visible',
  },
  {
    title: '详情ID',
    dataIndex: 'detail_id',
    key: 'detail_id',
  },
  {
    title: '路线名称',
    dataIndex: 'route.route_name', // 嵌套字段
    key: 'route.route_name',
  },
  {
    title: '车站ID',
    dataIndex: 'station_id',
    key: 'station_id',
  },
  {
    title: '车站顺序',
    dataIndex: 'station_order',
    key: 'station_order',
    // defaultSortOrder: 'ascend',
    // sorter: (a, b) => b['station_order'] - a['station_order'],
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    // width: 100, // 设置列宽
    render: (_, record) => {
      return <DetailAction record={record} />;
    },
  }
];



export default (props: { route: Route }) => {
  // const [dataSource, setDataSource] = useState(data);

  const handleDragSortEnd = async (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: RouteDetail[],
  ) => {
    console.log('排序后的数据', newDataSource);
    const result = await updateRouteOrders(newDataSource.map((item, index) => {
      return {
        detail_id: Number(item.detail_id),
        station_order: index
      }
    }))
    // if(result)
    console.log(result);
    if (result.statusCode === 200) {

      dispatch(incremented({ unit: 1 }))
      message.success('修改列表排序成功');
    } else {
      message.error('修改顺序失败')
    }
  };

  const [data, setData] = useState<RouteDetail[]>()
  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const res = await getRouteDetailByRouteId({ route_id: String(props.route.route_id) });
    // return;
    setData(res.data?.data)
  }
  const refreshTable = useSelector((state: RootState) => state.route.refreshTable);
  const dispatch = useDispatch();


  const getData = getDataFnFactory(navigator, getRouteDetailByRouteId)
  // const { data, error, loading } = useRequest(getRouteDetailByRouteId());
  const onSubmit = async (values: RouteDetail) => {
    const result = await createRouteDetailApi(values)
    // TODO 路线增加车站的接口异常处理，比如车站不存在
    if (result?.data) {
      message.success('创建成功啦')
      dispatch(
        incremented({
          unit: 1
        })
      );
    } else {
      message.error('创建失败')
      console.log('创建失败', result)
    }
    return true;
  }
  return (
    <div>
      <DragSortTable
        headerTitle={`【${props.route.route_name}】路线详情`}
        columns={columns}
        rowKey="detail_id"
        params={{ timestamp: refreshTable, route_id: props.route.route_id }}
        search={{ filterType: 'query' }}
        pagination={false}
        // dataSource={data}
        request={getData}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
        toolBarRender={() => [
          <CreateForm<RouteDetail>
            title="新增"
            initForm={{ route_id: props.route.route_id, station_id: '2', station_order: 0 }}
            onSubmit={onSubmit}
            triggerRender={() => {
              return <Button type="primary">新增</Button>
            }} >
            <RouteDetailForm />
          </CreateForm>
        ]}
      />
    </div>
  );
};