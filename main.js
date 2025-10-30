async function initWebGPU() {
  if (!navigator.gpu) {
    alert("WebGPU not supported!");
    return;
  }

  // 获取 GPU 设备
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  // 设置 Canvas
  const canvas = document.getElementById("gpuCanvas");
  const context = canvas.getContext("webgpu");

  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: format,
    alphaMode: "opaque",
  });

  // 创建一个简单的颜色渲染
  const encoder = device.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  const renderPass = encoder.beginRenderPass({
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.3, g: 0.6, b: 0.9, a: 1.0 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  });
  renderPass.end();
  device.queue.submit([encoder.finish()]);
}

initWebGPU();
