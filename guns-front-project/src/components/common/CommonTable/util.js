import { eachTreeData } from '@/utils/common/menu-util'

/**
 * 获取表格密度缓存的 key
 */
export function getSizeCacheKey(cacheKey) {
    return `${cacheKey}Size`;
}

/**
 * 获取缓存的表格密度
 * @param cacheKey 缓存的 key
 */
export function getCacheSize(cacheKey) {
    if (cacheKey) {
        const size = localStorage.getItem(getSizeCacheKey(cacheKey));
        if (size) {
            return JSON.parse(size);
        }
    }
}

/**
 * 获取初始显示的表格列
 * @param columns 列配置
 */
export function getInitColumns(columns) {
    const data = [];
    columns.forEach((d) => {
        if (d.children?.length) {
            const children = getInitColumns(d.children);
            if (children.length) {
                data.push({ ...d, checked: true, children });
            }
        } else {
            data.push({ ...d, checked: d.hideInTable ? false : true, });
        }
    });
    return data;
}

/**
 * 获取初始显示的表格列
 * @param columns 列配置
 * @param cacheKey 缓存的 key
 * @param sortable 是否排序
 */
export function getInitColumnsAndCache(
    columns,
    cacheKey,
    sortable
) {
    const cacheSetting = getCacheCols(cacheKey);
    if (!cacheSetting) {
        return getInitColumns(columns);
    }
    return getCheckedColumns(
        columns,
        cacheSetting.data,
        cacheSetting.checkedIds,
        sortable
    );
}

/**
 * 获取显示的列配置
 * @param columns 原始列数据
 * @param cols 列配置数据
 * @param checkedIds 选中数据的 id
 * @param sortable 是否进行排序
 */
export function getCheckedColumns(
    columns,
    cols,
    checkedIds,
    sortable
) {
    const data = [];
    if (columns) {
        columns.forEach((d) => {
            const key = getColKey(d);
            const temp = cols.find((c) => c.id === key);
            const fixed = temp?.fixed ?? d.fixed;
            const checked = temp?.checked ?? true;
            if (d.children) {
                const children = getCheckedColumns(
                    d.children,
                    cols,
                    checkedIds,
                    sortable
                );
                if (children.length) {
                    data.push({ ...d, fixed, checked, children });
                }
            } else {
                data.push({ ...d, fixed, checked });
            }
        });
    }
    // 排序
    if (sortable && data.length) {
        data.sort((a, b) => {
            const aId = getColKey(a);
            const bId = getColKey(b);
            let ai = cols.findIndex((c) => c.id === aId);
            let bi = cols.findIndex((c) => c.id === bId);
            // 父级列处理
            if (ai === -1 && a.children?.length) {
                const id = getColKey(a.children[0]);
                ai = cols.findIndex((c) => c.id === id);
            }
            if (bi === -1 && b.children?.length) {
                const id = getColKey(b.children[0]);
                bi = cols.findIndex((c) => c.id === id);
            }
            // 固定列处理
            if (ai === -1 && a.hideInSetting && a.fixed === 'right') {
                ai = cols.length;
            }
            if (a.fixed === true || a.fixed === 'left') {
                ai -= cols.length;
            } else if (a.fixed === 'right' || (a.hideInSetting && !a.fixed)) {
                ai += cols.length;
            }
            if (bi === -1 && b.hideInSetting && b.fixed === 'right') {
                bi = cols.length;
            }
            if (b.fixed === true || b.fixed === 'left') {
                bi -= cols.length;
            } else if (b.fixed === 'right' || (b.hideInSetting && !b.fixed)) {
                bi += cols.length;
            }
            return ai - bi;
        });
    }
    return data;
}

/**
 * 获取缓存的列配置下拉列表数据
 * @param cacheKey 缓存的 key
 */
export function getCacheCols(cacheKey) {
    if (cacheKey) {
        try {
            const temp = localStorage.getItem(getColsCacheKey(cacheKey));
            if (temp) {
                const data = JSON.parse(temp);
                if (Array.isArray(data)) {
                    const checkedIds = data.filter((d) => d.checked).map((d) => d.id);
                    return {
                        data,
                        checkedIds,
                        isAllChecked: data.length > 0 && data.length === checkedIds.length,
                        isIndeterminate:
                            checkedIds.length !== 0 && data.length !== checkedIds.length
                    };
                }
            }
        } catch (e) {
        }
    }
}

/**
 * 获取列配置缓存的 key
 */
export function getColsCacheKey(cacheKey) {
    return `${cacheKey}Cols`;
}

/**
 * 获取列 key
 */
export function getColKey(column) {
    const key = column.key || column.dataIndex;
    return (Array.isArray(key) ? key : [key]).join('.');
}

/**
 * 获取列配置下拉列表数据
 * @param columns 原始列数据
 * @param untitledText 未命名列文字
 */
export function getSettingCols(
    columns,
    untitledText,
    cacheKey
) {
    const cacheSetting = getCacheCols(cacheKey);
    if (cacheSetting) {
        return cacheSetting;
    }
    const data = [];
    if (columns) {
        eachTreeData(columns, (d) => {
            const id = getColKey(d);
            if (id && !d.children?.length && !d.hideInSetting) {
                data.push({
                    id,
                    key: d.key,
                    width: d.width || 120,
                    dataIndex: d.dataIndex,
                    title: d.title || untitledText,
                    checked: d.checked,
                    fixed: d.fixed,
                    ...d
                });
            }
        });
    }
    const checkedIds = data.filter((d) => d.checked).map((d) => d.id);
    return {
        data,
        checkedIds,
        isAllChecked: data.length > 0 && data.length === checkedIds.length,
        isIndeterminate:
            checkedIds.length !== 0 && data.length !== checkedIds.length
    };
}