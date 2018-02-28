package com.stylefeng.guns.core.page;

/**
 * 分页参数类（for BootStrap Table）
 *
 * @author fengshuonan
 * @date 2017年1月21日 下午2:21:35
 */
public class PageBT {

    private int limit;          // 每页显示个数

    private int offset;         // 查询的偏移量（查询的页数 = offset/limit + 1）

    private String order;       // 排序方式


    public PageBT() {
        super();
    }

    public PageBT(int limit, int offset) {
        super();
        this.limit = limit;
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public int getPageSize() {
        return this.limit;
    }

    public int getPageNumber() {
        return this.offset / this.limit + 1;
    }

    @Override
    public String toString() {
        return "PageBT [limit=" + limit + ", offset=" + offset + ", order=" + order + "]";
    }

}
