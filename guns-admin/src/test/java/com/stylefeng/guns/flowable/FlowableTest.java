package com.stylefeng.guns.flowable;

import com.alibaba.fastjson.JSON;
import org.flowable.engine.*;
import org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.repository.ProcessDefinition;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.flowable.task.api.TaskQuery;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

/**
 * 工作流的业务测试
 *
 * @author fengshuonan
 * @date 2017-12-02 20:37
 */
public class FlowableTest {

    ProcessEngine processEngine;

    @Before
    public void init() {
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://127.0.0.1:3306/guns_flowable?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull")
                .setJdbcUsername("root")
                .setJdbcPassword("root")
                .setJdbcDriver("com.mysql.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);

        processEngine = cfg.buildProcessEngine();
    }

    /**
     * 发布流程
     */
    @Test
    public void deploy() {
        RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deployment = repositoryService.createDeployment()
                .addClasspathResource("ExpenseProcess.bpmn20.xml")
                .deploy();

        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId())
                .singleResult();
        System.out.println("Found process definition : " + processDefinition.getName());
    }

    /**
     * 查看发布
     */
    @Test
    public void findDeploy() {
        RepositoryService repositoryService = processEngine.getRepositoryService();
        List<Deployment> list = repositoryService.createDeploymentQuery().list();
        for (Deployment deployment : list) {
            System.out.println(deployment.getCategory());
            System.out.println(deployment.getName());
            System.out.println("deploy = " + deployment.getId());
            System.out.println("key = " + deployment.getKey());
        }
    }

    /**
     * 启动流程
     */
    @Test
    public void start() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("taskUser", "fsn");
        ProcessInstance processInstance = processEngine.getRuntimeService().startProcessInstanceByKey("Expense", map);
        System.out.println("pid = " + processInstance.getId());
        System.out.println("activityId = " + processInstance.getActivityId());
        System.out.println("getProcessDefinitionId = " + processInstance.getProcessDefinitionId());
    }

    /**
     * 查看流程定义
     */
    @Test
    public void queryProcess() {
        List<ProcessInstance> list1 = processEngine.getRuntimeService().createProcessInstanceQuery().list();
        for (ProcessInstance processDefinition : list1) {
            System.out.println("id = " + processDefinition.getId());
            System.out.println("getDeploymentId = " + processDefinition.getDeploymentId());
            System.out.println("getTenantId = " + processDefinition.getTenantId());
            System.out.println("name = " + processDefinition.getName());
        }

        System.err.println("---------------------------------");
        List<ProcessDefinition> list = processEngine.getRepositoryService()
                .createProcessDefinitionQuery()
                .list();
        for (ProcessDefinition processDefinition : list) {
            System.out.println("id = " + processDefinition.getId());
            System.out.println("getDeploymentId = " + processDefinition.getDeploymentId());
            System.out.println("getTenantId = " + processDefinition.getTenantId());
            System.out.println("name = " + processDefinition.getName());
            System.out.println("key = " + processDefinition.getKey());
            System.out.println("version = " + processDefinition.getVersion());
            System.out.println("resourceName = " + processDefinition.getResourceName());
        }
    }

    /**
     * 删除流程定义
     */
    @Test
    public void delProcess() {
        processEngine.getRuntimeService().deleteProcessInstance("67501","abcd");
        //processEngine.getRepositoryService().deleteDeployment("25001", true);
        System.out.println("删除成功");
    }

    /**
     * 查看任务
     */
    @Test
    public void queryMyTask() {
        String name = "张三";

        TaskQuery taskQuery = processEngine.getTaskService().createTaskQuery().taskAssignee(name);
        List<Task> list = taskQuery.list();
        for (Task task : list) {
            System.out.println("name = " + task.getName());
            System.out.println(JSON.toJSON(task.getTaskLocalVariables()));
        }

        System.out.println("查询完毕!");
    }

    /**
     * 完成任务
     */
    @Test
    public void complete() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("money", 600);
        TaskService taskService = processEngine.getTaskService();
        taskService.complete("47513", map);
    }

    public static void main(String[] args) {
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:mysql://127.0.0.1:3306/flowable?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull")
                .setJdbcUsername("root")
                .setJdbcPassword("root")
                .setJdbcDriver("com.mysql.jdbc.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);

        ProcessEngine processEngine = cfg.buildProcessEngine();

        RepositoryService repositoryService = processEngine.getRepositoryService();
        Deployment deployment = repositoryService.createDeployment()
                .addClasspathResource("holiday-request.bpmn20.xml")
                .deploy();

        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId())
                .singleResult();
        System.out.println("Found process definition : " + processDefinition.getName());


        Scanner scanner = new Scanner(System.in);

        System.out.println("Who are you?");
        String employee = scanner.nextLine();

        System.out.println("How many holidays do you want to request?");
        Integer nrOfHolidays = Integer.valueOf(scanner.nextLine());

        System.out.println("Why do you need them?");
        String description = scanner.nextLine();

        RuntimeService runtimeService = processEngine.getRuntimeService();

        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("employee", employee);
        variables.put("nrOfHolidays", nrOfHolidays);
        variables.put("description", description);
        ProcessInstance processInstance =
                runtimeService.startProcessInstanceByKey("holidayRequest", variables);


        TaskService taskService = processEngine.getTaskService();
        List<Task> tasks = taskService.createTaskQuery().taskCandidateGroup("managers").list();
        System.out.println("You have " + tasks.size() + " tasks:");
        for (int i = 0; i < tasks.size(); i++) {
            System.out.println((i + 1) + ") " + tasks.get(i).getName());
        }

        System.out.println("Which task would you like to complete?");
        int taskIndex = Integer.valueOf(scanner.nextLine());
        Task task = tasks.get(taskIndex - 1);
        Map<String, Object> processVariables = taskService.getVariables(task.getId());
        System.out.println(processVariables.get("employee") + " wants " +
                processVariables.get("nrOfHolidays") + " of holidays. Do you approve this?");

        boolean approved = scanner.nextLine().toLowerCase().equals("y");
        variables = new HashMap<String, Object>();
        variables.put("approved", approved);
        taskService.complete(task.getId(), variables);
    }

}
