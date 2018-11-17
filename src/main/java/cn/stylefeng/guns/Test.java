package cn.stylefeng.guns;

import lombok.Data;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Data
public class Test {

    private List<File> directories = new ArrayList<>();

    String currentFilePath = "/Users/stylefeng/tmp/";
    String repoPath = "/Users/stylefeng/tmp/share";

    private void getAllDirs(String fileDir) {
        File file = new File(fileDir);
        File[] files = file.listFiles();
        if (files == null) {
            return;
        }
        for (File f : files) {
            if (f.isDirectory()) {
                //System.out.println(f.getAbsolutePath());
                directories.add(new File(f.getAbsolutePath()));
                getAllDirs(f.getAbsolutePath());
            }
        }
    }

    private boolean onlyPom(File dir) {
        boolean pom = false;
        boolean jar = false;

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.getName().endsWith(".pom")) {
                pom = true;
            } else if (file.getName().endsWith(".jar")) {
                jar = true;
            }
        }

        if (pom && !jar) {
            return true;
        } else {
            return false;
        }
    }

    private boolean jarAndPom(File dir) {
        boolean pom = false;
        boolean jar = false;

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.getName().endsWith(".pom")) {
                pom = true;
            } else if (file.getName().endsWith(".jar")) {
                jar = true;
            }
        }

        if (pom && jar) {
            return true;
        } else {
            return false;
        }
    }

    private boolean none(File dir) {
        boolean pom = false;
        boolean jar = false;

        File[] files = dir.listFiles();
        for (File file : files) {
            if (file.getName().endsWith(".pom")) {
                pom = true;
            } else if (file.getName().endsWith(".jar")) {
                jar = true;
            }
        }

        if (!pom && !jar) {
            return true;
        } else {
            return false;
        }
    }

    private void doOnlyPom(File directory) {

        File[] files = directory.listFiles();

        File pom = null;

        for (File file : files) {
            String name = file.getName();
            if (name.endsWith(".pom")) {
                pom = file;
            }
        }

        String cmd = "mvn " +
                "-s /Users/stylefeng/work/apache-maven-3.5.0/conf/settings.xml " +
                "deploy:deploy-file " +
                "-Durl=http://172.23.2.3:8081/repository/maven-host-sedinBJ/ " +
                "-DrepositoryId=maven-host-sedinBJ ";

        String absolutePath = pom.getAbsolutePath();

        //获取文件名
        String fileName = absolutePath.substring(absolutePath.lastIndexOf("/") + 1);
        String other = absolutePath.substring(0, absolutePath.lastIndexOf("/"));

        //获取version
        String version = other.substring(other.lastIndexOf("/") + 1);
        other = absolutePath.substring(0, other.lastIndexOf("/"));

        //获取artifactId
        String artifactId = other.substring(other.lastIndexOf("/") + 1);
        other = absolutePath.substring(0, other.lastIndexOf("/"));

        //获取groupId
        other = other.substring(currentFilePath.length());
        String groupId = other.replaceAll("/", ".");

        //获取packing
        String packing = "-Dpackaging=pom ";

        cmd += packing;
        cmd += " -Dfile=" + pom.getAbsolutePath() + " ";
        cmd += " -DgroupId=" + groupId + " ";
        cmd += " -DartifactId=" + artifactId + " ";
        cmd += " -Dversion=" + version + " ";

        System.out.println(cmd);
        System.out.println();


    }

    private void doPomAndJar(File directory) {

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
    }

    public void execute() {
        Test readFile = new Test();
        readFile.getAllDirs(repoPath);

        List<File> directories = readFile.getDirectories();

        for (File directory : directories) {
            if (none(directory)) {
                continue;
            } else if (jarAndPom(directory)) {
                doPomAndJar(directory);
            } else if (onlyPom(directory)) {
                doOnlyPom(directory);
            }

        }
    }

    public static void main(String[] args) {
        new Test().execute();
    }
}
