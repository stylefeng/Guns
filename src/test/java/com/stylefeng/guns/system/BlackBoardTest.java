package com.stylefeng.guns.system;

import com.stylefeng.guns.base.BaseTest;
import org.junit.Test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * 首页通知展示测试
 *
 * @author fengshuonan
 * @date 2017-05-21 15:02
 */
public class BlackBoardTest extends BaseTest {

    @Test
    public void blackBoardTest() {
        try {
            super.mockMvc.perform(get("/blackboard"))
                    .andExpect(status().isOk())
                    .andExpect(model().attributeExists("noticeList"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
