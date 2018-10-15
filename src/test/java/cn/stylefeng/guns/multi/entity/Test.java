package cn.stylefeng.guns.multi.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author fengshuonan
 * @since 2018-07-10
 */
public class Test implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "aaa", type = IdType.AUTO)
    private Integer aaa;

    private String bbb;


    public Integer getAaa() {
        return aaa;
    }

    public void setAaa(Integer aaa) {
        this.aaa = aaa;
    }

    public String getBbb() {
        return bbb;
    }

    public void setBbb(String bbb) {
        this.bbb = bbb;
    }

    @Override
    public String toString() {
        return "Test{" +
                "aaa=" + aaa +
                ", bbb=" + bbb +
                "}";
    }
}
