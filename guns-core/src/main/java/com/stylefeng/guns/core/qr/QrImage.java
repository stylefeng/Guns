package com.stylefeng.guns.core.qr;

/**
 * 二维码图片对象
 *
 * @author fengshuonan
 * @date 2016年12月8日 上午11:37:09
 */
public class QrImage {

    /**
     * 二维码的内容
     */
    private String qrContent;

    /**
     * 二维码的宽度
     */
    private int qrWidth;

    /**
     * 二维码的高度
     */
    private int qrHeight;

    /**
     * 二维码中间图标的文件路径
     */
    private String qrIconFilePath;

    /**
     * 二维码中间小图标的边长
     */
    private int qrIconWidth;

    /**
     * 顶部文字的高度
     */
    private int topWrodHeight;

    /**
     * 文字的大小
     */
    private int wordSize;

    /**
     * 文字的内容
     */
    private String wordContent;

    /**
     * 文件的输出路径
     */
    private String fileOutputPath;

    public static class Builder {
        private String qrContent;
        private int qrWidth;
        private int qrHeight;
        private String qrIconFilePath;
        private int topWrodHeight;
        private int wordSize;
        private String wordContent;
        private String fileOutputPath;
        private int qrIconWidth;

        public Builder() {
        }

        public Builder setQrContent(String qrContent) {
            this.qrContent = qrContent;
            return this;
        }

        public Builder setQrWidth(int qrWidth) {
            this.qrWidth = qrWidth;
            return this;
        }

        public Builder setQrHeight(int qrHeight) {
            this.qrHeight = qrHeight;
            return this;
        }

        public Builder setQrIconFilePath(String qrIconFilePath) {
            this.qrIconFilePath = qrIconFilePath;
            return this;
        }

        public Builder setTopWrodHeight(int topWrodHeight) {
            this.topWrodHeight = topWrodHeight;
            return this;
        }

        public Builder setWordSize(int wordSize) {
            this.wordSize = wordSize;
            return this;
        }

        public Builder setWordContent(String wordContent) {
            this.wordContent = wordContent;
            return this;
        }

        public Builder setFileOutputPath(String fileOutputPath) {
            this.fileOutputPath = fileOutputPath;
            return this;
        }

        public Builder setQrIconWidth(int qrIconWidth) {
            this.qrIconWidth = qrIconWidth;
            return this;
        }

        public QrImage build() {
            return new QrImage(this.qrContent, this.qrWidth, this.qrHeight, this.qrIconFilePath, this.qrIconWidth,
                    this.topWrodHeight, this.wordSize, this.wordContent, this.fileOutputPath);
        }
    }

    public QrImage(String qrContent, int qrWidth, int qrHeight, String qrIconFilePath, int qrIconWidth,
                   int topWrodHeight, int wordSize, String wordContent, String fileOutputPath) {
        super();
        this.qrContent = qrContent;
        this.qrWidth = qrWidth;
        this.qrHeight = qrHeight;
        this.qrIconFilePath = qrIconFilePath;
        this.qrIconWidth = qrIconWidth;
        this.topWrodHeight = topWrodHeight;
        this.wordSize = wordSize;
        this.wordContent = wordContent;
        this.fileOutputPath = fileOutputPath;
    }

    public String getQrContent() {
        return qrContent;
    }

    public int getQrWidth() {
        return qrWidth;
    }

    public int getQrHeight() {
        return qrHeight;
    }

    public String getQrIconFilePath() {
        return qrIconFilePath;
    }

    public int getTopWrodHeight() {
        return topWrodHeight;
    }

    public int getWordSize() {
        return wordSize;
    }

    public String getWordContent() {
        return wordContent;
    }

    public String getFileOutputPath() {
        return fileOutputPath;
    }

    public int getQrIconWidth() {
        return qrIconWidth;
    }
}
