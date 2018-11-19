package cn.stylefeng.guns;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class MavenDeployLocalFile {

    private List<File> directories = new ArrayList<>();

    /**
     * 当前工作目录
     */
    private String CURRENT_PATH = "/Users/stylefeng/tmp/";

    /**
     * 仓库的地址
     */
    private String REPO_PATH = "/Users/stylefeng/tmp/share";

    /**
     * maven的settings文件配置路径
     */
    private String SETTINGS_CONFIG = "/Users/stylefeng/work/apache-maven-3.5.0/conf/settings.xml";

    /**
     * 仓库的名称
     */
    private String REPOSITORY_ID = "maven-host-sedinBJ";

    /**
     * 仓库的url
     */
    private String REPOSITORY_URL = "http://172.23.2.3:8081/repository/maven-host-sedinBJ/";

    /**
     * 递归获取一个目录下的所有文件目录路径
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:17 AM
     */
    private void getAllDirs(String fileDir) {
        File file = new File(fileDir);
        File[] files = file.listFiles();
        if (files == null) {
            return;
        }
        for (File item : files) {
            if (item.isDirectory()) {
                directories.add(new File(item.getAbsolutePath()));
                getAllDirs(item.getAbsolutePath());
            }
        }
    }

    /**
     * 获取目录的类型
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:21 AM
     */
    private DirectoryType getDirectoryType(File directoryPath) {
        boolean pom = false;
        boolean jar = false;

        File[] files = directoryPath.listFiles();
        if (files == null) {
            return DirectoryType.NONE;
        }

        for (File file : files) {
            if (file.getName().endsWith(".pom")) {
                pom = true;
            } else if (file.getName().endsWith(".jar")) {
                jar = true;
            }
        }

        if (pom && !jar) {
            return DirectoryType.POM;
        } else if (jar && pom) {
            return DirectoryType.JAR_AND_POM;
        } else {
            return DirectoryType.NONE;
        }
    }

    /**
     * 对只有pom文件的目录，执行mvn deploy操作
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:24 AM
     */
    private void doOnlyPom(File directory) {

        File[] files = directory.listFiles();
        if (files == null) {
            return;
        }

        File pom = null;
        for (File file : files) {
            String name = file.getName();
            if (name.endsWith(".pom")) {
                pom = file;
            }
        }

        String command = buildComman(FileType.POM, null, pom);
        executeCommand(command);
    }

    /**
     * 对同时包含jar和pom文件的目录，执行mvn deploy操作
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:24 AM
     */
    private void doJarAndPom(File directory) {

        File[] files = directory.listFiles();

        File pom = null;
        File jar = null;

        for (File file : files) {
            String name = file.getName();
            if (name.endsWith(".pom")) {
                pom = file;
            } else if (name.endsWith(".jar")) {
                jar = file;
            }
        }

        if (jar != null) {
            String command = buildComman(FileType.JAR, jar, pom);
            executeCommand(command);
        }

    }

    /**
     * 程序入口
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:25 AM
     */
    public void beginDeploy() {

        //初始化，获取所有的目录存到list
        this.getAllDirs(REPO_PATH);

        //遍历所有目录，并根据不同类型的目录，执行deploy
        for (File directory : directories) {
            DirectoryType directoryType = getDirectoryType(directory);
            if (directoryType.equals(DirectoryType.NONE)) {
                continue;
            } else if (directoryType.equals(DirectoryType.JAR_AND_POM)) {
                doJarAndPom(directory);
            } else if (directoryType.equals(DirectoryType.POM)) {
                doOnlyPom(directory);
            }
        }
    }

    /**
     * 执行comman命令
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:26 AM
     */
    private void executeCommand(String command) {
        try {
            System.out.println(command);
            //Process exec = Runtime.getRuntime().exec(command);
            //int i = exec.waitFor();
            //System.out.println("执行结果：" + i);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 判断packing是不是pom
     *
     * @author fengshuonan
     * @Date 2018/11/19 12:25 PM
     */
    public static boolean packingIsPom(File pom) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(new FileInputStream(pom)));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().contains("<packaging>pom</packaging>")) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                reader.close();
            } catch (Exception e) {
            }
        }
        return false;
    }

    /**
     * 构造command命令
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:38 AM
     */
    private String buildComman(FileType fileType, File deployJar, File deployJarPom) {

        if (fileType.equals(FileType.POM)) {

            //判断是不是packing pom
            if (!packingIsPom(deployJarPom)) {
                return "";
            }
        }

        String command = "mvn " +
                "-s " + SETTINGS_CONFIG + " " +
                "deploy:deploy-file " +
                "-Durl=" + REPOSITORY_URL + " " +
                "-DrepositoryId=" + REPOSITORY_ID + " " +
                "-DgeneratePom=false ";

        //获取packing
        String packing;
        if (fileType.equals(FileType.JAR)) {
            packing = "-Dpackaging=jar ";
        } else {
            packing = " ";
        }

        //获取pomFile和file
        String pomFile;
        String file;
        if (fileType.equals(FileType.POM)) {
            file = deployJarPom.getAbsolutePath();
            pomFile = deployJarPom.getAbsolutePath();
        } else {
            pomFile = deployJarPom.getAbsolutePath();
            file = deployJar.getAbsolutePath();
        }

        command += packing;
        command += " -Dfile=" + file + " ";
        command += " -DpomFile=" + pomFile + " ";

        return command;
    }

    /**
     * 目录的类型，什么都没，只有pom，同时包含jar和pom
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:36 AM
     */
    private enum DirectoryType {
        NONE, POM, JAR_AND_POM
    }

    /**
     * 文件类型
     *
     * @author fengshuonan
     * @Date 2018/11/18 11:37 AM
     */
    private enum FileType {
        JAR, POM
    }

    public static void main(String[] args) {
        new MavenDeployLocalFile().beginDeploy();
    }
}
