<template>
     <table class="table-auto">
          <thead>
               <tr class="divide-x divide-green-600">
                    <slot name="table-header"></slot>
               </tr>
          </thead>

          <tbody>
               <slot name="table-body"></slot>
          </tbody>
     </table>
</template>