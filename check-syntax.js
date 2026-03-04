const fs = require('fs');

// 读取HTML文件
const content = fs.readFileSync('e:\\桌面文件\\88\\deepseek_html_20260126_954f0f.html', 'utf8');

// 提取所有script标签中的JavaScript代码
const jsMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g);

if (jsMatches) {
    console.log(`找到 ${jsMatches.length} 个script标签`);
    
    jsMatches.forEach((match, index) => {
        const jsCode = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        
        // 跳过空的script标签
        if (!jsCode.trim()) {
            console.log(`Script ${index + 1}: 空`);
            return;
        }
        
        try {
            // 使用Function构造函数检查语法
            new Function(jsCode);
            console.log(`Script ${index + 1}: OK`);
        } catch (e) {
            console.log(`Script ${index + 1}: ERROR - ${e.message}`);
            // 显示错误位置附近的代码
            const errorPosition = e.stack.match(/at \[native code\]:(\d+):(\d+)/);
            if (errorPosition) {
                const line = parseInt(errorPosition[1]);
                const column = parseInt(errorPosition[2]);
                const lines = jsCode.split('\n');
                const startLine = Math.max(0, line - 3);
                const endLine = Math.min(lines.length, line + 3);
                console.log('错误位置附近的代码:');
                for (let i = startLine; i < endLine; i++) {
                    console.log(`${i + 1}: ${lines[i]}`);
                }
            } else {
                // 显示前200个字符
                console.log('代码片段:', jsCode.substring(0, 200) + '...');
            }
        }
    });
} else {
    console.log('没有找到script标签');
}