import ClipboardJS from 'clipboard'

export default ({ profiles }) => <>
  {profiles.map(({ from, ts, data }) => _.isEmpty(data) ? null : <div>
    <h3>{ts}</h3>
    <table>
      <thead>
        <tr>
          {/* <th>操作</th> */}
          {/* <th>类型</th> */}
          <th width='80'>节点</th>
          <th width='140'>时间</th>
          <th width='100'>数据集</th>
          <th width='100'>查询时间</th>
          <th width='100'>查询索引</th>
          <th width='100'>查询数量</th>
          <th width='100'>查询容量</th>
          <th width='100'>结果字节</th>
          <th>查询</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({
          _id,
          op,
          protocol,
          createdAt,
          name,
          millis,
          keysExamined,
          nreturned,
          prettyResponseLength,
          responseLength,
          querystr,
        }) => <tr key={_id}>
          {/* <td>{op}</td> */}
          {/* <td>{protocol}</td> */}
          <td>{from}</td>
          <td>{createdAt}</td>
          <td>{name}</td>
          <td>{millis} ms</td>
          <td>{keysExamined}</td>
          <td>{nreturned}</td>
          <td>{prettyResponseLength}</td>
          <td>{responseLength}</td>
          <td><div className='copy auto-size' data-clipboard-text={querystr}>{querystr}</div></td>
        </tr>)}
      </tbody>
    </table>
  </div>)}
  <Hook didMount={() => this.clp = new ClipboardJS('.copy')} willUnmount={() => this.clp && this.clp.destroy()} />
</>
